import NewSurveyOptions from "~/components/local/newSurveyOptions"
import PrivatePageStructure from "~/components/structure/PrivatePageStructure/PrivatePageStructure"

export default function NewSuperSurvey() {

  return (
    <PrivatePageStructure title={"Nova pesquisa"} returnPath="/">
      <NewSurveyOptions />
    </PrivatePageStructure>
  )
}
