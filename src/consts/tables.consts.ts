export interface ColumnData {
  title: string;
  key: string;
}
export interface TableData {
  cols: ColumnData[];
  queryKey: string;
}

const USER_TABLE: TableData = {
  cols: [
    { title: 'ИД', key: 'id' },
    { title: 'Фамилия', key: 'last_name' },
    { title: 'Имя', key: 'first_name' },
    { title: 'Отчество', key: 'middle_name' },
    { title: 'Логин', key: 'handle' },
    { title: 'Фото', key: 'image' },
    { title: 'Email', key: 'email' },
    { title: 'Роль', key: 'role' },
    { title: 'Создано', key: 'created_at' },
    { title: 'Обновлено', key: 'updated_at' },
  ],
  queryKey: 'users',
};

export const TABLES: Record<string, TableData> = {
  users: USER_TABLE,
};
