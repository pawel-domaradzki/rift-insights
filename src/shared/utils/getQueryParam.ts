export function getQueryParam(
    param?: string | string[],
    allowedValues?: string[]
  ): string {
    if (!param) return "";
    const value = Array.isArray(param) ? param[0] : param;
  
    if (allowedValues && !allowedValues.includes(value)) {
      return ""; 
    }
  
    return value;
  }
  