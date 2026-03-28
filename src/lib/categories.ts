export interface CategoryInfo {
  id: string;
  label: string;
  description: string;
}

export const CATEGORIES: CategoryInfo[] = [
  { id: 'all', label: 'All Films', description: 'The complete collection' },
  { id: 'survival', label: 'Survival', description: 'When staying alive is the only goal' },
  { id: 'bunker', label: 'Bunker / Isolation', description: 'Sealed in with no way out' },
  { id: 'psychological', label: 'Psychological', description: 'The mind turns on itself' },
  { id: 'post-apocalyptic', label: 'Post-Apocalyptic', description: 'After the world ends' },
  { id: 'confined', label: 'Confined Space', description: 'The walls are closing in' },
  { id: 'group-dynamics', label: 'Group Dynamics', description: 'Trust dissolves under pressure' },
  { id: 'societal-collapse', label: 'Societal Collapse', description: 'Civilization stripped away' },
];

export function getCategoryInfo(id: string): CategoryInfo | undefined {
  return CATEGORIES.find(c => c.id === id);
}

export function getCategoryLabel(id: string): string {
  return getCategoryInfo(id)?.label ?? id;
}
