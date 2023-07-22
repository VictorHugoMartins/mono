// import Image from 'next/image'

interface ColumnOptionsProps {
  type?: "string" | "number";
  allOptions?: boolean;
  data?: any;
  renderNumbers?: boolean;
}

const ColumnsOptions: React.FC<ColumnOptionsProps> = ({ type, allOptions, data, renderNumbers }) => {
  return (
    <fieldset>
      <legend>Dados para coleta</legend>

      {allOptions && <div>
        <input type="checkbox" id="scales" name="scales" />
        <label htmlFor="scales">Todos</label>
      </div>}

      <div>
        <input type="checkbox" id="scales" name="scales" checked />
        <label htmlFor="scales">Código identificador do quarto</label>
      </div>

      {data?.map((item) => (
        ((renderNumbers && item.type === "range") || (!renderNumbers && item.type !== "range")) && <div>
          <input type="checkbox" id={item.value} name={item.value} />
          <label htmlFor={item.value}>{item.label}</label>
        </div>
      ))}
    </fieldset >
  )
}

export default ColumnsOptions;