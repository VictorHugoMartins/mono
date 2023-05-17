import { GetServerSideProps } from "next";
import FormPageStructure from "~/components/structure/FormPageStructure";
import PrivatePageStructure from "~/components/structure/PrivatePageStructure/PrivatePageStructure";
import { API_NOTIFICATION_TEMPLATE } from "~/config/apiRoutes/notificationTemplate";
import privateroute from "~/routes/private.route";
import { FormSuccess } from "~/utils/FormSuccess";

interface NotificationTemplateEditProps {
    token: string;
}

const NotificationTemplateEdit: React.FC<NotificationTemplateEditProps> = ({ token }) => {
    return (
        <PrivatePageStructure
            title="Editar Template de Notificação"
            returnPath="/adm/templatesdenotificacoes/lista"
        >
            <FormPageStructure
                buildPath={API_NOTIFICATION_TEMPLATE.BUILD()}
                buttonSubmitText="Salvar"
                buttonCancelText="Cancelar"
                returnPath="/adm/templatesdenotificacoes/lista"
                submitPath={API_NOTIFICATION_TEMPLATE.SAVE()}
                preparePath={API_NOTIFICATION_TEMPLATE.PREPARE(token)}
                onSuccess={FormSuccess}
            />
        </PrivatePageStructure>
    );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { token } = ctx.query;

    return { props: { token } };
};
export default privateroute(NotificationTemplateEdit)