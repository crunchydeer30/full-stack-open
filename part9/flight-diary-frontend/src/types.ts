export interface DiaryEntry {
  id: number;
  date: string;
  weather: string;
  visibility: string;
}

export interface DiaryEntryProps {
  entry: DiaryEntry;
}

export interface DiaryEntriesProps {
  entries: DiaryEntry[];
}