import NewSurveyOptions from "~/components/local/Forms/NewSurveyForm"
import PrivatePageStructure from "~/components/structure/PrivatePageStructure/PrivatePageStructure"
import privateroute from "~/routes/private.route";

function NewSuperSurvey() {

  return (
    <PrivatePageStructure title={"Nova pesquisa"} returnPath="/">
      <NewSurveyOptions />
    </PrivatePageStructure>
  )
}

export default privateroute(NewSuperSurvey);