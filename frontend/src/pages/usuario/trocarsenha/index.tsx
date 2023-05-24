import ChangePasswordForm from "~/components/ChangePasswordForm"
import PrivatePageStructure from "~/components/structure/PrivatePageStructure/PrivatePageStructure"
import privateroute from "~/routes/private.route"

function ChangePassword() {
  return (
    <PrivatePageStructure title={"Atualizar senha"} returnPath="/">
      <ChangePasswordForm />
    </PrivatePageStructure>
  )
}

export default privateroute(ChangePassword)