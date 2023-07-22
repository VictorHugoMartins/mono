import EditUserForm from "~/components/local/EditUserForm"
import PrivatePageStructure from "~/components/structure/PrivatePageStructure/PrivatePageStructure"
import privateroute from "~/routes/private.route"

function EditUser() {
  return (
    <PrivatePageStructure title={"Atualizar dados de usuário"} returnPath="/">
      <EditUserForm />
    </PrivatePageStructure>
  )
}

export default privateroute(EditUser)