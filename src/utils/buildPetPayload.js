export function buildPetPayload(base, overrides = {}) {
  return deepClean({
    ...base,
    ...overrides,
    category: {
      ...base.category,
      ...overrides.category
    },
    tags: overrides.tags ? overrides.tags : base.tags
  });
}

function deepClean(obj) {
  return Object.fromEntries(
    Object.entries(obj)
      .filter(([_, v]) => v !== undefined)
      .map(([k, v]) => [
        k,
        typeof v === "object" && v !== null && !Array.isArray(v)
          ? deepClean(v)
          : v
      ])
  );
}