import React from "react";
import { getRowStyles } from "../utils/style";
import { toTitleCase} from "../utils/General";
import stringSimilarity from 'string-similarity';

// Remove unwanted words from an address
const removeUnwantedWords = (address) => {
  const unwantedWords = ["ib", "19", "g"];
  return unwantedWords.reduce((cleanedAddress, word) => {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    return cleanedAddress.replace(regex, '');
  }, address);
};

// Standardize common variations in the address
const standardizeVariations = (address) => {
  return address
    .replace(/\bsout\b/gi, 'south')
    .replace(/\bpgs\b/gi, 'parganas')
    .replace(/\s+/g, ' '); // Remove extra spaces
};

// Format an address
const formatAddress = (address) => {
  let formattedAddress = [
    address?.First_Line_Of_Address_non_normalized,
    address?.Second_Line_Of_Address_non_normalized,
    address?.Third_Line_Of_Address_non_normalized,
    address?.ZIP_Postal_Code_non_normalized
  ].filter(Boolean).join(', ');

  return formattedAddress
    .replace(/,+/g, ',')
    .replace(/ ,/g, ',')
    .trim();
};

// Normalize an address for uniqueness
export const normalizeAddress = (address) => {
  let formattedAddress = formatAddress(address)
    .toLowerCase()
    .trim();

  formattedAddress = standardizeVariations(formattedAddress);
  formattedAddress = removeUnwantedWords(formattedAddress);
  
  // Remove duplicate segments
  const uniqueSegments = [...new Set(formattedAddress.split(',').map(segment => segment.trim()))];
  return uniqueSegments.join(', ');
};

// Fuzzy matching addresses to find unique ones using string-similarity
const fuzzyMatchAddresses = (addresses) => {
  const normalizedAddresses = addresses.map(normalizeAddress);
  const uniqueAddresses = [];

  const seen = new Set();

  normalizedAddresses.forEach((address) => {
    if (!seen.has(address)) {
      let isUnique = true;
      for (let i = 0; i < uniqueAddresses.length; i++) {
        if (stringSimilarity.compareTwoStrings(address, uniqueAddresses[i]) > 0.45) {  // Adjust threshold
          isUnique = false;
          break;
        }
      }
      if (isUnique) {
        uniqueAddresses.push(address);
        seen.add(address);
      }
    }
  });

  return uniqueAddresses;
};

// Get address category based on the indicator
export const getAddressCategory = (indicator) => {
  if (indicator === undefined || indicator === null) {
    return 'Not Categorised';
  }

  const normalizedIndicator = indicator.toString().padStart(2, '0');
  const categories = {
    '01': 'Permanent Address',
    '02': 'Residence Address',
    '03': 'Office Address',
    '04': 'Not Categorised'
  };

  return categories[normalizedIndicator] || 'Not Categorised';
};

// Get unique addresses from accounts
export const getUniqueAddresses = (accounts) => {
  const addressList = [];
  accounts?.forEach((account) => {
    account?.CAIS_Holder_Address_Details?.forEach((address) => {
      addressList.push(address);
    });
  });

  const uniqueAddresses = fuzzyMatchAddresses(addressList);
  return uniqueAddresses.map((address) => {
    return addressList.find((originalAddress) => normalizeAddress(originalAddress) === address);
  });
};

// Component to display address row in table
export const AddressRow = ({ address, index }) => {
  const formattedAddress = formatAddress(address);
  const addressDisplay = (formattedAddress);
  const { bgColorClass, textColorClass } = getRowStyles(index);

  return (    
      <tr className={`${bgColorClass}`}>
        <td className={`px-4 pr-24 py-4 ${textColorClass}`}>{toTitleCase(String(addressDisplay)) || '-'}</td>
        <td className={`px-4 py-4 ${textColorClass}`}>{getAddressCategory(toTitleCase(String(address?.Address_indicator_non_normalized))) || '-'}</td>
      </tr>
 
  );
};

// Normalize a phone number by removing leading zeros and country code prefixes
const normalizePhoneNumber = (phoneNumber) => {
  if (!phoneNumber) return '';
  phoneNumber = phoneNumber.toString();
  phoneNumber = phoneNumber.replace(/^0+/, '');
  phoneNumber = phoneNumber.replace(/^(\+?91)/, '');
  return phoneNumber;
};

// Component to display phone row in table
export const PhoneRow = ({ phone, index }) => {
  const { bgColorClass, textColorClass } = getRowStyles(index);

  return (
    <tr className={`${bgColorClass}`}>
      {/* <td className={`px-8 py-4 ${textColorClass}`}>{phone?.Telephone_Type === 2 ? 'Mobile' : 'Landline'}</td> */}
      <td className={`px-8 py-4 ${textColorClass}`}>{normalizePhoneNumber(phone?.Telephone_Number || phone?.Mobile_Telephone_Number) || '-'}</td>
    </tr>
  );
};

// Get unique phones from accounts
export const getUniquePhones = (accounts) => {
  const phoneMap = new Map();
  accounts?.forEach((account) => {
    account?.CAIS_Holder_Phone_Details?.forEach((phone) => {
      const phoneNumber = phone?.Telephone_Number || phone?.Mobile_Telephone_Number || '-';
      const normalizedPhone = normalizePhoneNumber(phoneNumber).toLowerCase().trim();
      phoneMap.set(normalizedPhone, phone);
    });
  });
  return Array.from(phoneMap.values());
};
