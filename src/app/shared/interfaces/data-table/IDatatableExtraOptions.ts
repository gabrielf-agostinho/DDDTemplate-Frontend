export interface IDatatableExtraOption<T> {
  icon?: string;
  severity?: "success" | "info" | "warn" | "danger" | "help" | "primary" | "secondary" | "contrast" | null | undefined;
  tooltip?: string;
  onClick: (source: T) => void;
}