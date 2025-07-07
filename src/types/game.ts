export interface Factor {
  id: string;
  name: string;
  type: 'part' | 'whole' | 'cause' | 'effect';
  value: number;
  description: string;
}

export interface Branch {
  id: string;
  name: string;
  factors: Factor[];
  isComplete: boolean;
  score: number;
}

export interface Topic {
  id: string;
  name: string;
  description: string;
  branches: Branch[];
  targetScore: number;
}

export interface GameState {
  currentTopic: Topic | null;
  availableFactors: Factor[];
  score: number;
  level: number;
  isGameActive: boolean;
}

export interface DragItem {
  factor: Factor;
  sourceType: 'available' | 'branch';
  sourceBranchId?: string;
}
