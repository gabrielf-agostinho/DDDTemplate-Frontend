import { CurrencyPipe, DatePipe } from "@angular/common";
import { SelectLabelPipe } from "./select-label.pipe";

export const PIPES_MAP = [
  {
    key: 'date',
    value: DatePipe,
  },
  // {
  //   key: 'cpfCnpj',
  //   value: CpfCnpjPipe,
  // },
  {
    key: 'selectLabel',
    value: SelectLabelPipe,
  },
  {
    key: 'currency',
    value: CurrencyPipe,
  },
];
