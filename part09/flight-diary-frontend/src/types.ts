export interface DiaryEntry {
  id: number;
  date: string;
  weather: Weather;
  visibility: Visibility;
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

export enum Weather {
  Sunny = 'sunny',
  Rainy = 'rainy',
  Cloudy = 'cloudy',
  Stormy = 'stormy',
  Windy = 'windy',
}

export enum Visibility {
  Great = 'great',
  Good = 'good',
  Ok = 'ok',
  Poor = 'poor',
}