import { readFileSync } from 'fs';
import chromium from '@sparticuz/chromium';
import puppeteer from 'puppeteer-core'; // Keep using puppeteer-core
import { S3Client, HeadObjectCommand, GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from '../shared/App';
import { getReportNumber } from './controllers/jsonController';
import { performance } from 'perf_hooks'; // Import performance from perf_hooks
require('dotenv').config();

// Initialize the S3 client
const s3 = new S3Client({ region: process.env.AWS_REGION });

// Function to check if a file exists in S3
const checkIfFileExists = async (filename) => {
  try {
    const command = new HeadObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: filename,
    });
    await s3.send(command);
    return true; // File exists
  } catch (error) {
    if (error.name === 'NotFound') {
      return false; // File does not exist
    }
    throw error; // Handle other errors
  }
};

// Function to generate a signed URL
const generateSignedUrl = async (filename) => {
  const command = new GetObjectCommand({
    Bucket: process.env.S3_BUCKET_NAME,
    Key: filename,
  });

  try {
    const signedUrl = await getSignedUrl(s3, command, { expiresIn: 3600 }); // URL valid for 1 hour
    return signedUrl;
  } catch (error) {
    console.error('Error generating signed URL:', error);
    throw error;
  }
};

// Function to generate PDF using Puppeteer with @sparticuz/chromium
async function generatePDF(htmlContent) {
  const browser = await puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath(), // Use chromium executable path
    headless: true, // Enable headless mode
  });

  const page = await browser.newPage();

  // Load Tailwind CSS
  const tailwindCSS = readFileSync('/var/task/public/output.css', 'utf8'); // Adjust path for Lambda environment

  // Combine CSS and HTML content
  const fullHTMLContent = `
    <html>
      <head>
        <style>${tailwindCSS}</style>
      </head>
      <body>
        ${htmlContent}
      </body>
    </html>
  `;

  await page.setContent(fullHTMLContent, {
    timeout: 0
  });

  const pdfBuffer = await page.pdf({
    format: 'A4',
    printBackground: true,
    quality: 10,
    margin: { top: '3mm', right: '3mm', bottom: '3mm', left: '3mm' },
    preferCSSPageSize: true,
    timeout: 0
  });

  await page.close();
  await browser.close();
  return pdfBuffer;
}

// Function to upload the PDF to S3
async function uploadToS3(pdfBuffer, filename) {
  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: filename,
    Body: pdfBuffer,
    ContentType: 'application/pdf'
  };

  await s3.send(new PutObjectCommand(params));
}

// AWS Lambda handler
exports.handler = async (event) => {
  try {
    console.log('Received event:', JSON.stringify(event, null, 2));
    const content = event; // Assuming data is passed in the body

    if (!content) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Content not found' }),
      };
    }

    const reportNumber = getReportNumber(content);
    if (!reportNumber) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Report number not found in the provided data' }),
      };
    }

    const filename = `credit-report-${reportNumber}.pdf`;

    // Check if the file already exists in S3
    const fileExists = await checkIfFileExists(filename);

    if (fileExists) {
      console.log(`${filename} already exists. Generating signed URL...`);
      const signedUrl = await generateSignedUrl(filename);
      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'File already exists, returning signed URL.', url: signedUrl }),
      };
    }

    console.log('File does not exist. Generating PDF...');

    // Start timing the process
    const startTime = performance.now();

    // Render HTML
    const startHtmlRender = performance.now();
    const htmlContent = renderToString(<App data={content} />);
    const endHtmlRender = performance.now();
    console.log(`HTML rendering time: ${(endHtmlRender - startHtmlRender).toFixed(2)} ms`);

    // Generate PDF
    const startPdfGeneration = performance.now();
    const pdfBuffer = await generatePDF(htmlContent);
    const endPdfGeneration = performance.now();
    console.log(`PDF generation time: ${(endPdfGeneration - startPdfGeneration).toFixed(2)} ms`);

    // Upload PDF to S3
    const startUpload = performance.now();
    await uploadToS3(pdfBuffer, filename);
    const endUpload = performance.now();
    console.log(`S3 upload time: ${(endUpload - startUpload).toFixed(2)} ms`);

    // Generate signed URL
    const startSignedUrl = performance.now();
    const signedUrl = await generateSignedUrl(filename);
    const endSignedUrl = performance.now();
    console.log(`Signed URL generation time: ${(endSignedUrl - startSignedUrl).toFixed(2)} ms`);

    const endTime = performance.now();
    console.log(`Total time for generation and upload: ${(endTime - startTime).toFixed(2)} ms`);

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'PDF generated and uploaded to S3 successfully!',
        url: signedUrl,
        generationTime: (endPdfGeneration - startPdfGeneration) / 1000, // Convert to seconds
        uploadTime: (endUpload - startUpload) / 1000,
        totalTime: (endTime - startTime) / 1000,
      }),
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error', details: error.message }),
    };
  }
};
