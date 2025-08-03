
export interface VehicleInfo {
  make: string;
  model: string;
  year: string;
  engine?: string;
  bodyClass?: string;
  fuelType?: string;
  driveType?: string;
}

export const vinService = {
  // Decode VIN using NHTSA API (free service)
  async decodeVin(vin: string): Promise<VehicleInfo> {
    if (!vin || vin.length !== 17) {
      throw new Error('Invalid VIN number. VIN must be exactly 17 characters.');
    }

    try {
      const response = await fetch(
        `https://vpic.nhtsa.dot.gov/api/vehicles/decodevinvalues/${vin}?format=json`
      );
      
      if (!response.ok) {
        throw new Error('Failed to decode VIN');
      }

      const data = await response.json();
      const result = data.Results[0];

      if (result.ErrorCode !== '0') {
        throw new Error(result.ErrorText || 'Invalid VIN number');
      }

      return {
        make: result.Make || 'Unknown',
        model: result.Model || 'Unknown',
        year: result.ModelYear || 'Unknown',
        engine: result.EngineModel || result.DisplacementL ? `${result.DisplacementL}L ${result.EngineModel || 'Engine'}` : undefined,
        bodyClass: result.BodyClass || undefined,
        fuelType: result.FuelTypePrimary || undefined,
        driveType: result.DriveType || undefined
      };
    } catch (error) {
      console.error('VIN decoding error:', error);
      throw error;
    }
  },

  // Validate VIN format and check digit
  validateVin(vin: string): boolean {
    if (!vin || vin.length !== 17) return false;
    
    // Check for invalid characters (no I, O, Q)
    const validPattern = /^[A-HJ-NPR-Z0-9]{17}$/;
    if (!validPattern.test(vin)) return false;

    // Basic check digit validation (simplified)
    const weights = [8, 7, 6, 5, 4, 3, 2, 10, 0, 9, 8, 7, 6, 5, 4, 3, 2];
    const values: { [key: string]: number } = {
      '0': 0, '1': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9,
      'A': 1, 'B': 2, 'C': 3, 'D': 4, 'E': 5, 'F': 6, 'G': 7, 'H': 8,
      'J': 1, 'K': 2, 'L': 3, 'M': 4, 'N': 5, 'P': 7, 'R': 9,
      'S': 2, 'T': 3, 'U': 4, 'V': 5, 'W': 6, 'X': 7, 'Y': 8, 'Z': 9
    };

    let sum = 0;
    for (let i = 0; i < 17; i++) {
      if (i !== 8) { // Skip check digit position
        sum += (values[vin[i]] || 0) * weights[i];
      }
    }

    const checkDigit = sum % 11;
    const expectedCheckDigit = checkDigit === 10 ? 'X' : checkDigit.toString();
    
    return vin[8] === expectedCheckDigit;
  }
};
