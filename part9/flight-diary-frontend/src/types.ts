export interface DiaryEntry {
  id: number;
  date: string;
  weather: string;
  visibility: string;
}

export interface NewDiaryEntry extends Omit<DiaryEntry, 'id'> {
  comment: string;
}

export interface DiaryEntryProps {
  entry: DiaryEntry;
}

export interface DiaryEntriesProps {
  entries: DiaryEntry[];
}

export interface DiaryEntryFormProps {
  addDiaryEntry(newEntry: NewDiaryEntry): void;
}

export interface NotificationProps {
  message: string;
}
