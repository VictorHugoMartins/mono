import { GetServerSideProps } from 'next';
import React from 'react';
import FormPageStructure from '~/components/structure/FormPageStructure';
import PrivatePageStructure from '~/components/structure/PrivatePageStructure/PrivatePageStructure';
import { API_MANAGEMENT } from '~/config/apiRoutes/management';
import { API_POST_MANAGEMENT } from '~/config/apiRoutes/posts';
import { FormSuccess } from '~/utils/FormSuccess';

type PostManagementProps = {
    token: string;
}
const PostsManagementsEdit: React.FC<PostManagementProps> = ({ token }) => {
    const _returnUrl = "/adm/gerenciamentodeposts/lista/"
    return (
        <PrivatePageStructure
            title="Editar Post"
            returnPath={_returnUrl}
        >
            <FormPageStructure
                preparePath={API_POST_MANAGEMENT.PREPARE(token)}
                buildPath={API_POST_MANAGEMENT.BUILD()}
                submitPath={API_POST_MANAGEMENT.SAVE()}
                buttonSubmitText="Salvar"
                buttonCancelText="Cancelar"
                returnPath={_returnUrl}
                onSuccess={FormSuccess}
            />
        </PrivatePageStructure>
    );
}
export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { token } = ctx.query;

    return { props: { token } };
};
export default PostsManagementsEdit;