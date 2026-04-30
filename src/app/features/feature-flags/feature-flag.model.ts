export type FlagAction = 'enabled' | 'disabled' | 'rollout_changed' | 'tag_added';

export interface FeatureFlag {
  flagId: string;
  name: string;
  description: string;
  enabled: boolean;
  rolloutPercentage: number;
  environment: string;
  tags: string[];
}

export interface AuditEntry {
  flagId: string;
  action: FlagAction;
  environment: string;
  changedBy: string;
  changedAt: Date;
  previousValue: string;
  newValue: string;
}
