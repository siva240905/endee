function checkEligibility(user, scheme) {

  // Income check
  if (user.income > scheme.income_limit) return false;

  // Age check
  if (user.age < scheme.min_age || user.age > scheme.max_age) return false;

  // Category check
  if (!scheme.category_allowed.includes(user.caste)) return false;

  // Occupation check (allow "Any")
  if (
    !scheme.occupation_required.toLowerCase().includes("any") &&
    !scheme.occupation_required.toLowerCase().includes(user.occupation.toLowerCase())
  ) {
    return false;
  }

  return true;
}

module.exports = checkEligibility;