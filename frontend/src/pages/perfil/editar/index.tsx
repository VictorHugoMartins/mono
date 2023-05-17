import { useRouter } from 'next/router';
import React from 'react';
import FormPageStructure from '~/components/structure/FormPageStructure';
import PrivatePageStructure from '~/components/structure/PrivatePageStructure/PrivatePageStructure';
import RedirectTo from '~/utils/Redirect/Redirect';
import Toast from '~/utils/Toast/Toast';


const ConfigurationEdit: React.FC = () => {
  const router = useRouter();
  return (
    <PrivatePageStructure title='Editar Dados da Conta'>
      <FormPageStructure
        buildPath='/Account/Build'
        preparePath='/Account/Prepare'
        buttonSubmitText="Salvar"
        buttonCancelText='Cancelar'
        onCancel={()=>{RedirectTo("/dashboard/?view=0")}}
        submitPath="/Account/Save"
        onSuccess={(e) => { 
          Toast.success("Salvo com sucesso!"); 
          e.handleSubmiting(false); 
          RedirectTo("/dashboard/?view=0");
        }}
      />
    </PrivatePageStructure>
  );
}

export default ConfigurationEdit;