export type TGroup = {
  id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
};

export type TCreateGroup = {
  name: string;
};

export type TUpdateGroup = {
  name?: string;
};

export type TStudent = {
  id: number;
  first_name: string;
  last_name: string;
  group_id: number;
  group: TGroup;
  created_at: Date;
  updated_at: Date;
};

export type TCreateStudent = {
  first_name: string;
  last_name: string;
  group_id: number;
};

export type TUpdateStudent = {
  first_name?: string;
  last_name?: string;
  group_id?: number;
};
