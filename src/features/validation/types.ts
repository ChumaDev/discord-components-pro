/**
 * Validation Feature Types
 */

export interface ValidationError {
  field: string;
  message: string;
  code: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
}

export interface ComponentValidation extends ValidationResult {
  componentId?: string;
  componentType?: number;
  isValid: boolean;
  hasErrors: boolean;
}

export interface BatchValidationResult {
  valid: boolean;
  errors: Record<string, ValidationError[]>;
  validCount: number;
  invalidCount: number;
}
