const generateReferralCode = () => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const codeLength = 8;

  let referralCode = "";

  while (true) {
    for (let i = 0; i < codeLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      referralCode += characters.charAt(randomIndex);
    }

    const existingReferral = false;

    if (!existingReferral) {
      break;
    }

    referralCode = "";
  }

  return referralCode;
};

console.log(typeof generateReferralCode());
