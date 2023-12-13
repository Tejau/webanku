function calculateDemographics(loans, ageRanges, salaryRanges) {
    const demographics = {};
  
    loans.forEach((loan) => {
      const user = loan.user;
      const age = user.age;
      const salary = user.salary;
  
      const ageRange = ageRanges.find((range) => {
        const [min, max] = range.split('-');
        return age >= min && age <= max;
      });
  
      const salaryRange = salaryRanges.find((range) => salary <= range);
  
      if (ageRange && salaryRange) {
        if (!demographics[ageRange]) {
          demographics[ageRange] = {};
        }
  
        if (!demographics[ageRange][salaryRange]) {
          demographics[ageRange][salaryRange] = { count: 1, gender: user.gender };
        } else {
          demographics[ageRange][salaryRange].count += 1;
        }
      }
    });
  
    return demographics;
  }
  const are = [1,232,23,32]
  function calculateMedian(arr) {
    const sortedArr = arr.sort((a, b) => a - b);
    const middle = Math.floor(sortedArr.length / 2);
  
    if (sortedArr.length % 2 === 0) {
      return (sortedArr[middle - 1] + sortedArr[middle]) / 2;
    } else {
      return sortedArr[middle];
    }
  }
  console.log(calculateMedian(are))
  module.exports={calculateDemographics, calculateMedian}