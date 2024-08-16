const respondBox = document.querySelector(".responseBox");
document.getElementById("checkBtn").addEventListener("click", () => {
  const inputEl = document.querySelector("#inputSpace").value.trim();

  const isPalindrome = function (str) {
    str = str.replace(/[\s.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").toLowerCase();
    const reversedStr = str.split("").reverse().join("");
    return str === reversedStr;
  };

  if (inputEl.length === 0) {
    respondBox.textContent = "Input field cannot be empty!";
    return;
  }

  const result = isPalindrome(inputEl);
  respondBox.textContent = result
    ? `Nice Job! "${inputEl}" is a Palindrome!`
    : `"${inputEl}" is not a Palindrome!`;

  respondBox.classList.remove("isPalindrome", "notPalindrome");
  setTimeout(() => {
    respondBox.classList.add(result ? "isPalindrome" : "notPalindrome");
  }, 500);
});
function close() {
setTimeout(() => {
    respondBox.classList.toggle("close"); // Or use respondBox.classList.add('hide'); if you have a CSS class .hide that sets display:none;
  }, 1000);
}
if(respondBox.classlist.!contain("close") {
  close()
} else {
  respondBox.classList.remove("close");
}
  
/////////////////////////////////////////////////////////////////
// const convertRoman = function (num) {
//   const romalNumerals = {
//     M: 1000,
//     CM: 900,
//     D: 500,
//     CD: 400,
//     C: 100,
//     XC: 90,
//     L: 50,
//     XL: 40,
//     X: 10,
//     IX: 9,
//     V: 5,
//     IV: 4,
//     I: 1,
//   };
//   let result = "";
// for (let symbol in romanNumerals) {
//   while (num >= romanNumerals[symbol]) {
//     result += symbol;
//     num -= romanNumerals[symbol];
//   }
// }
// return result
// };
// console.log(convertRoman(80));

/*
Caesar's Cipher
Caesar's Cipher, also known as the Caesar Shift or Caesar's Code, 
is one of the simplest and oldest encryption techniques. 
It is a type of substitution cipher where each letter in the 
plaintext is shifted a certain number of places down or up 
the alphabet. This shift value is known as the "key" or "shift."


function rot13(str) {
  // Define a function to decode a single character
  function decodeChar(char) {
    const charCodeA = 'A'.charCodeAt(0);
    const charCodeZ = 'Z'.charCodeAt(0);

    // Check if the character is an uppercase letter
    if (char.match(/[A-Z]/)) {
      let decodedCharCode = char.charCodeAt(0) - 13;
      
      // Adjust for wrap-around if the character goes below 'A'
      if (decodedCharCode < charCodeA) {
        decodedCharCode += 26;
      }
      
      return String.fromCharCode(decodedCharCode);
    } else {
      // If it's not an uppercase letter, return it unchanged
      return char;
    }
  }

  // Split the input string into an array of characters
  const charArray = str.split('');

  // Use map to apply the decodeChar function to each character
  const decodedArray = charArray.map(decodeChar);

  // Join the decoded characters back into a string
  return decodedArray.join('');
}

const decodedString = rot13("SERR PBQR PNZC");
console.log(decodedString); // Output should be "FREE CODE CAMP"

*/

/*

Telephone Number Validator

Return true if the passed string looks like a valid US phone number.
The user may fill out the form field any way they choose as long 
as it has the format of a valid US number. The following are 
examples of valid formats for US numbers 
(refer to the tests below for other variants):

function telephoneCheck(str) {
  // Define a regular expression pattern for valid US phone numbers
  const pattern = /^(1\s?)?(\(\d{3}\)|\d{3})([\s\-]?)\d{3}([\s\-]?)\d{4}$/;

  // Use the test() method to check if the string matches the pattern
  return pattern.test(str);
}
*/

/*
Design a cash register drawer function checkCashRegister() that 
accepts purchase price as the first argument (price), 
payment as the second argument (cash), and cash-in-drawer (cid) 
as the third argument.
cid is a 2D array listing available currency.

The checkCashRegister() function should always return an object 
with a status key and a change key.

Return {status: "INSUFFICIENT_FUNDS", change: []} 
if cash-in-drawer is less than the change due, or 
if you cannot return the exact change.

Return {status: "CLOSED", change: [...]} 
with cash-in-drawer as the value for the key 
change if it is equal to the change due.

Otherwise, return {status: "OPEN", change: [...]}, with the change due in coins and bills, sorted in highest to lowest order, as the value of the change key.

function checkCashRegister(price, cash, cid) {
  const currencyUnits = [
    ["PENNY", 0.01],
    ["NICKEL", 0.05],
    ["DIME", 0.1],
    ["QUARTER", 0.25],
    ["ONE", 1],
    ["FIVE", 5],
    ["TEN", 10],
    ["TWENTY", 20],
    ["ONE HUNDRED", 100]
  ];

  // Calculate the change due
  let changeDue = cash - price;

  // Calculate the total cash in the drawer
  let totalCashInDrawer = 0;
  for (let i = 0; i < cid.length; i++) {
    totalCashInDrawer += cid[i][1];
  }
  totalCashInDrawer = parseFloat(totalCashInDrawer.toFixed(2)); // Fix floating-point precision issues

  // Initialize the change array
  let change = [];

  // Handle different cases
  if (totalCashInDrawer < changeDue) {
    // Not enough cash in the drawer
    return { status: "INSUFFICIENT_FUNDS", change: [] };
  } else if (totalCashInDrawer === changeDue) {
    // Drawer has exactly the change due
    return { status: "CLOSED", change: cid };
  } else {
    // Calculate change
    for (let i = currencyUnits.length - 1; i >= 0; i--) {
      const [unit, unitValue] = currencyUnits[i];
      const unitAvailable = cid[i][1];
      const maxUnits = Math.floor(unitAvailable / unitValue);
      const unitsToReturn = Math.min(maxUnits, Math.floor(changeDue / unitValue));

      if (unitsToReturn > 0) {
        const amount = unitsToReturn * unitValue;
        change.push([unit, amount]);
        changeDue = parseFloat((changeDue - amount).toFixed(2));
      }
    }

    // Check if changeDue is not completely given
    if (changeDue > 0) {
      return { status: "INSUFFICIENT_FUNDS", change: [] };
    }

    return { status: "OPEN", change };
  }
}

// Example usage:
const result = checkCashRegister(19.5, 20, [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100]
]);
console.log(result);

*/
