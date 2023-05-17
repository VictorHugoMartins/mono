import { ColumnBodyType } from "primereact/column";
import { DataTableRowClassNameOptions, DataTableRowClickEventParams, DataTableRowExpansionTemplate } from "primereact/datatable";
import { DataTableColumnType } from "~/types/global/DataTableColumnType";
import { GenericComponentType } from "~/types/global/GenericComponentType";

export interface PrimeDataTableProps {

  /** array de buttons personalizado */
  buttons?: ColumnBodyType;
  /** botão de cancelamento */
  cancelButton?: any;
  /** colunas da tabela */
  columns: DataTableColumnType[];
  /** colunas extras para a tabela */
  extraColumns?: ExtraColumnsType[];
  /** se existira numero de paginação */
  paginator?: boolean;
  /** ao clicar na row ela renderiza algum evento */
  onRowClick?: (e: DataTableRowClickEventParams) => void;
  /** qual tipo de responsivo da tabela */
  responsive?: "scroll" | "stack";
  /**Classe extra para a linha */
  rowClassName?: (data: any, options: DataTableRowClassNameOptions) => string | object;
  /** objeto da montagem das rows */
  rows: any[];
  /** titulo do modal de criação */
  postLabel?: string;
  /** quantas rows por pagina */
  rowsPerPage?: number;
  /** customização do body das colunas caso necessario */
  customizedBodyColumns?: React.ReactNode;
  /** se a tabela e editavel ou não */
  editable?: boolean;
  /** se ela é expansiva ou não */
  expander?: boolean;
  children?(data: any, options: DataTableRowExpansionTemplate, allowEdit?: boolean): React.ReactNode,

  /** se a tabela é autoeditavel  */
  editComponent?: GenericComponentType;
  /** aparecer ou não o botão de pesquisa */
  hideSearch?: boolean;
  /** esconder os botões */
  hideButtons?: boolean;
  /** se os valores de pesquisa são externos */
  externalFiltersValue?: string;
  /** se as rows irão expandir externamente */
  externalExpandedRows?: any;
  /** a hierarquia dos nivels do conteudo */
  level?: number;

  resume?: any;
  refreshList?: () => Promise<void>;
  /** titulo da tabela */
  tableTitle?: string;

  /** tag que origina botão de colapsa tudo*/
  colapseAllButton?: boolean;

  /* permite a renderização do botão de adicionar item em casos que não dependem do rowdata */
  allowEdit?: boolean;
}

export type ExtraColumnsType = {
  header: string;
  column: ColumnBodyType;
};
