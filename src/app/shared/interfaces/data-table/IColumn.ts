export interface IColumn {
  field: string;
  header: string;
  options?: {
    classes?: string;
    filter?: {
      placeholder?: string;
      matchMode?:
        | 'startsWith'
        | 'contains'
        | 'notContains'
        | 'endsWith'
        | 'equals'
        | 'notEquals'
        | 'lt'
        | 'lte'
        | 'gt'
        | 'gte'
        | 'is'
        | 'isNot'
        | 'before'
        | 'after'
        | 'dateIs'
        | 'dateIsNot'
        | 'dateBefore'
        | 'dateAfter';
      type: 'text' | 'boolean' | 'date' | 'select';
      options?: { id?: number | null; description: string }[];
    };
    value?: {
      useCheckIcon?: boolean;
      pipe?: {
        name?: string;
        format?: string;
      };
    };
  };
}
