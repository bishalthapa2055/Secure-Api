export const netAmount = (
  originalPrice: number,
  discountedPercentage: number
) => {
  const discountAmt: number = (discountedPercentage / 100) * originalPrice;
  const netAmt: number =
    originalPrice - (discountedPercentage / 100) * originalPrice;
  // console.log(discountAmt, netAmt);
  return { discountAmt, netAmt };
};
