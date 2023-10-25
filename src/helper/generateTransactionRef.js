function GenerateTransactionRef() {
  // You can use a combination of user-specific information, timestamp, and a random string
  const timestamp = new Date().getTime();
  const randomString = Math.random().toString(36).substring(7); // Generates a random string
  const tx_ref = `payment-${timestamp}-${randomString}`;
  return tx_ref;
}

export default GenerateTransactionRef;
