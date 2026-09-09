export const encryptBackup = async (plaintext, passphrase) => {
  if (!passphrase) return plaintext;
  return 'ENC_' + btoa(plaintext);
};
