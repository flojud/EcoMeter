// Reference values for the different consumption types
export const ELECTRICY_SINGLE = 1500;
export const ELECTRICY_COUPLE = 2500;
export const ELECTRICY_SMALLFAMILY = 3500;
export const ELECTRICY_LARGEFAMILY = 4250;

export const GAS_S = 5000;
export const GAS_M = 12000;
export const GAS_L = 18000;
export const GAS_XL = 35000;

export const WATER_SINGLE = 40;
export const WATER_COUPLE = 80;
export const WATER_SMALLFAMILY = 125;
export const WATER_LARGEFAMILY = 150;

// Meter references for the different consumption types
export const ELECTRICY_METER_REF = {
  green: ELECTRICY_COUPLE,
  orange: ELECTRICY_SMALLFAMILY,
  red: ELECTRICY_LARGEFAMILY,
};

export const GAS_METER_REF = {
  green: GAS_M,
  orange: GAS_L,
  red: GAS_XL,
};

export const WATER_METER_REF = {
  green: WATER_COUPLE,
  orange: WATER_SMALLFAMILY,
  red: WATER_LARGEFAMILY,
};

// Consumption references for the different consumption types
export const ELECTRICY_CONSUMPTION_REF = {
  green: Math.round(ELECTRICY_COUPLE / 365),
  orange: Math.round(ELECTRICY_SMALLFAMILY / 365),
  red: Math.round(ELECTRICY_LARGEFAMILY / 365),
};

export const GAS_CONSUMPTION_REF = {
  green: Math.round(GAS_M / 365),
  orange: Math.round(GAS_L / 365),
  red: Math.round(GAS_XL / 365),
};

export const WATER_CONSUMPTION_REF = {
  green: Math.round(WATER_COUPLE / 365),
  orange: Math.round(WATER_SMALLFAMILY / 365),
  red: Math.round(WATER_LARGEFAMILY / 365),
};
