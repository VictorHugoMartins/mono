import React from 'react';
import style from './politicPrivacity.module.scss'
// import { Container } from './styles';
import imagePrivate from '../../assets/images/private.png'
import Footer from '~/components/ui/Footer';
import LocalNavBar from '~/components/local/LocalNavBar/LocalNavBar';

const Politicadeprivacidade: React.FC = () => {
  return (
    <div className={style.container}>
      <LocalNavBar title={"Termos e Privacidade"} returnPath={"/"} publicPage />
      <div style={{ paddingInline: 30, paddingBlock: 20 }}>
        <h1 className={style.Title} >Política de Privacidade</h1>
        <div className={style.textsImageContainer}>
          <p>
            A Second Mind Tecnologia e Sistemas LTDA., pessoa jurídica com sede
            na rua Cataguases, 323A, bairro Carijós , Conselheiro Lafaiete - MG,
            Brasil, 36406-109, inscrita no CNPJ/MF sob o nº 30.156.853/0001-88
            levam a sua privacidade a sério e zela pela segurança e proteção de
            dados de todos os seus clientes, parceiros, fornecedores e usuários
            (“Usuários” ou “você”) do site “www.scmanager.secondmind.com.br” e qualquer outro
            site, plataforma, aplicativo operado pela SCManager (“Plataforma”).
            <br/>
            <br/>
            Esta Política de Privacidade (“Política de Privacidade”) destina-se
            a informá-lo sobre o modo como nós utilizamos e divulgamos
            informações coletadas em suas visitas à nossa Plataforma e em
            mensagens que trocamos com você (“Comunicações”). Esta Política de
            Privacidade aplica-se somente a informações coletadas por meio da
            Plataforma.
            <br />
            <br />
            Ao acessar a plataforma, enviar comunicações ou fornecer qualquer
            tipo de dado pessoal, você entende os termos aqui previstos e aceita
            esta política de privacidade, consentindo com o tratamento de suas
            informações, conforme aqui descrito ou nos termos da legislação em
            vigor.
            <br />
          </p>
          <img src={imagePrivate} className={style.image} />
        </div>
        <br/>
        <p>
          Esta Política de Privacidade fornece uma visão geral de nossas
          práticas de privacidade e das escolhas que você pode fazer, bem como
          direitos que você pode exercer em relação aos Dados Pessoais
          tratados por nós. Se você tiver alguma dúvida sobre o uso de Dados
          Pessoais, entre em contato pelo e-mail contato@secondmind.com.br.{" "}
        </p>
        <br/>
        <p>
          Além disso, a Política de Privacidade não se aplica a quaisquer
          aplicativos, produtos, serviços, site ou recursos de mídia social de
          terceiros que possam ser oferecidos ou acessados por meio da
          Plataforma. O acesso a esses links fará com que você deixe a
          Plataforma e possa resultar na coleta ou compartilhamento de
          informações sobre você por terceiros. Nós não controlamos,
          endossamos ou fazemos quaisquer representações sobre esses sites de
          terceiros ou suas práticas de privacidade, que podem ser diferentes
          das nossas. Recomendamos que você revise a política de privacidade
          de qualquer site com o qual você interaja antes de permitir a coleta
          e o uso de seus Dados Pessoais.{" "}
        </p>
        <br/>
        <p>
          Caso você nos envie Dados Pessoais referentes a outras pessoas
          físicas, você declara ter a competência para fazê-lo e declara ter
          obtido o consentimento necessário para autorizar o uso de tais
          informações nos termos desta Política de Privacidade.{" "}
        </p>

        <h2 className={style.SubTitle}>1. Definições</h2>
        <p>1.1 Para os fins desta Política de Privacidade: </p>
        <ul className={style.UlStyle}>
          <li>
            (i)“Dados Pessoais” significa qualquer informação que, direta ou
            indiretamente, identifique ou possa identificar uma pessoa
            natural, como por exemplo, nome, CPF, data de nascimento, endereço
            IP, dentre outros;
            <li>
              {" "}
              (ii)“Dados Pessoais Sensíveis” significa qualquer informação que
            </li>{" "}
            revele, em relação a uma pessoa natural, origem racial ou étnica,
            convicção religiosa, opinião política, filiação a sindicato ou a
            organização de caráter religioso, filosófico ou político, dado
            referente à saúde ou à vida sexual, dado genético ou biométrico;{" "}
          </li>
          <li>
            {" "}
            (iii)“Tratamento de Dados Pessoais” significa qualquer operação
            efetuada no âmbito dos Dados Pessoais, por meio de meios
            automáticos ou não, tal como a recolha, gravação, organização,
            estruturação, armazenamento, adaptação ou alteração, recuperação,
            consulta, utilização, divulgação por transmissão, disseminação ou,
            alternativamente, disponibilização, harmonização ou associação,
            restrição, eliminação ou destruição. Também é considerado
            Tratamento de Dados Pessoais qualquer outra operação prevista nos
            termos da legislação aplicável;{" "}
          </li>
          <li>
            {" "}
            (iv)“Leis de Proteção de Dados” significa todas as disposições
            legais que regulem o Tratamento de Dados Pessoais, incluindo,
            porém sem se limitar, a Lei nº 13.709/18, Lei Geral de Proteção de
            Dados Pessoais (“LGPD”).{" "}
          </li>
        </ul>
        <h2 className={style.SubTitle}>2. Uso de Dados Pessoais</h2>
        <p>
          2.1 Coletamos e usamos Dados Pessoais para gerenciar o seu
          relacionamento com o SCManager e melhor atendê-lo quando você estiver
          usando a Plataforma, personalizando e melhorando sua experiência.
          Exemplos de como usamos os dados incluem:{" "}
        </p>
        <ul className={style.UlStyle}>
          <li>
            {" "}
            (i) Para cobrar e fatura os valores previstos nos serviços por
            você contratados;{" "}
          </li>
          <li>
            {" "}
            (ii) Para confirmar ou corrigir as informações que temos sobre
            você;{" "}
          </li>
          <li>
            {" "}
            (iii) Para enviar informações que acreditamos ser do seu
            interesse;{" "}
          </li>
          <li>
            {" "}
            (iv) Para personalizar sua experiência de uso da Plataforma; e
          </li>
          <li>
            {" "}
            (v) Para entrarmos em contato por um número de telefone e/ou
            endereço de e-mail fornecido, suporte, solução de problemas e,
            quando necessário, para fins comerciais razoáveis, tais como envio
            de informações promocionais de produtos ou serviços do SCManager ou de
            nossos parceiros. Neste caso, se o Usuário assim o desejar, poderá
            solicitar a remoção ou alteração de seus dados pessoais enviando
            um e-mail para contato@secondmind.com.br .{" "}
          </li>
        </ul>
        <p>
          2.2 Além disso, os Dados Pessoais fornecidos também podem ser
          utilizados na forma que julgarmos necessária ou adequada:{" "}
        </p>
        <ul className={style.UlStyle}>
          <li> (a) nos termos das Leis de Proteção de Dados; </li>
          <li> (b) para atender exigências de processo judicial; </li>
          <li>
            {" "}
            (c) para cumprir decisão judicial, decisão regulatória ou decisão
            de autoridades competentes, incluindo autoridades fora do país de
            residência; (d) para aplicar nossos Termos e Condições de Uso;
          </li>
          <li> (e) para proteger nossas operações; </li>
          <li>
            {" "}
            (f) para proteger direitos, privacidade, segurança nossos, seus ou
            de terceiros;{" "}
          </li>
          <li> (g) para detectar e prevenir fraude; </li>
          <li>
            {" "}
            (h) permitir-nos usar as ações disponíveis ou limitar danos que
            venhamos a sofrer; e
          </li>
          <li> (i) de outros modos permitidos por lei. </li>
        </ul>
        <h2 className={style.SubTitle}>3. Não fornecimento de Dados Pessoais</h2>
        <p>
          3.1 Você não é obrigado a compartilhar os Dados Pessoais que
          solicitamos, no entanto, se você optar por não os compartilhar, em
          alguns casos, não poderemos fornecer a você acesso completo à
          Plataforma, alguns recursos especializados ou ser capaz de responder
          efetivamente a quaisquer consultas que você possa ter.{" "}
        </p>
        <h2 className={style.SubTitle}>4. Dados coletados</h2>
        <p>
          4.1 O público em geral poderá navegar na Plataforma sem necessidade
          de qualquer cadastro e envio de Dados Pessoais. No entanto, algumas
          das funcionalidades da Plataforma poderão depender de cadastro e
          envio de Dados Pessoais.{" "}
        </p>
        <p>4.2 No contato conosco, o SCManager poderá coletar: </p>
        <ul className={style.UlStyle}>
          <li>
            (i) Dados de contato. Nome, sobrenome, número de telefone, cidade,
            Estado e endereço de e-mail; e
          </li>
          <li>
            {" "}
            (ii) Informações que você envia. Informações que você envia via
            formulário (dúvidas, reclamações, sugestões, críticas, elogios
            etc.).{" "}
          </li>
        </ul>
        <p>4.3 Na navegação geral na Plataforma, o SCManager poderá coletar: </p>
        <ul className={style.UlStyle}>
          <li>
            {" "}
            (i) Dados de localização. Dados de geolocalização quando você
            acessa a Plataforma;{" "}
          </li>
          <li>
            {" "}
            (ii) Preferências. Informações sobre suas preferências e
            interesses em relação à Plataforma (quando você nos diz o que eles
            são ou quando os deduzimos do que sabemos sobre você) e como você
            prefere receber nossas Comunicações;{" "}
          </li>
          <li>
            {" "}
            (iii) Dados de navegação na Plataforma. Informações sobre suas
            visitas e atividades na Plataforma, incluindo o conteúdo (e
            quaisquer anúncios) com os quais você visualiza e interage,
            informações sobre o navegador e o dispositivo que você está
            usando, seu endereço IP, sua localização, o endereço do site a
            partir do qual você chegou. Algumas dessas informações são
            coletadas usando nossas Ferramentas de Coleta Automática de Dados,
            que incluem cookies, web beacons e links da web incorporados. Para
            saber mais, leia como nós usamos Ferramentas de Coleta Automática
            de Dados no item 7 abaixo;{" "}
          </li>
          <li>
            {" "}
            (iv) Outras informações que podemos coletar. Outras informações
            que não revelem especificamente a sua identidade ou que não são
            diretamente relacionadas a um indivíduo, tais como informações
            sobre navegador e dispositivo; dados de uso da Plataforma; e
            informações coletadas por meio de cookies, pixel tags e outras
            tecnologias.{" "}
          </li>
        </ul>
        <p>4.4 Nós não coletamos Dados Pessoais Sensíveis. </p>
        <h2 className={style.SubTitle} >5. Compartilhamento de Dados Pessoais com terceiros</h2>
        <p>5.1 O SCManager poderá compartilhar seus Dados Pessoais:</p>
        <ul className={style.UlStyle}>
          <li>
            {" "}
            (i) Com a(s) empresa(s) parceira(s) que você selecionar ou optar
            em enviar os seus dados, dúvidas, perguntas etc., bem como com
            provedores de serviços ou parceiros para gerenciar ou suportar
            certos aspectos de nossas operações comerciais em nosso nome.
            Esses provedores de serviços ou parceiros podem estar localizados
            nos Estados Unidos, no Brasil ou em outros locais globais,
            incluindo servidores para homologação e produção, e prestadores de
            serviços de hospedagem e armazenamento de dados, gerenciamento de
            fraudes, suporte ao cliente, vendas em nosso nome, atendimento de
            pedidos, personalização de conteúdo, atividades de publicidade e
            marketing (incluindo publicidade digital e personalizada) e
            serviços de TI, por exemplo;{" "}
          </li>
          <li>
            {" "}
            (ii) Com terceiros, com o objetivo de nos ajudar a gerenciar a
            Plataforma; e
          </li>
          <li>
            {" "}
            (iii) Com terceiros, caso ocorra qualquer reorganização, fusão,
            venda, joint venture, cessão, transmissão ou transferência de toda
            ou parte da nossa empresa, ativo ou capital (incluindo os
            relativos à falência ou processos semelhantes){" "}
          </li>
        </ul>
        <h2 className={style.SubTitle}>6. Transferências internacionais de Dados</h2>
        <p>
          6.1 Dados Pessoais e informações de outras naturezas coletadas pelo
          SCManager podem ser transferidos ou acessados por entidades pertencentes
          ao grupo corporativo das empresas parceiras em todo o mundo de
          acordo com esta Política de Privacidade.{" "}
        </p>
        <h2 className={style.SubTitle} >7. Forma de coleta automática de Dados Pessoais</h2>
        <p>
          7.1 Quando você visita a Plataforma, ela pode armazenar ou recuperar
          informações em seu navegador, principalmente na forma de cookies,
          que são arquivos de texto contendo pequenas quantidades de
          informação. Visite nossa Política de Cookies da SCManager para saber
          mais.{" "}
        </p>
        <p>
          7.2 Essas informações podem ser sobre você, suas preferências ou seu
          dispositivo e são usadas principalmente para que a Plataforma
          funcione como você espera. As informações geralmente não o
          identificam diretamente, mas podem oferecer uma experiência na
          internet mais personalizada.{" "}
        </p>
        <p>
          7.3 De acordo com esta Política de Privacidade e a Política de
          Cookies do SCManager, nós e nossos prestadores de serviços terceirizados,
          mediante seu consentimento, podemos coletar seus Dados Pessoais de
          diversas formas, incluindo, entre outros:{" "}
        </p>
        <ul className={style.UlStyle}>
          <li>
            7.3.1 Por meio do navegador ou do dispositivo: Algumas informações
            são coletadas pela maior parte dos navegadores ou automaticamente
            por meio de dispositivos de acesso à internet, como o tipo de
            computador, resolução da tela, nome e versão do sistema
            operacional, modelo e fabricante do dispositivo, idioma, tipo e
            versão do navegador de Internet que está utilizando. Podemos
            utilizar essas informações para assegurar que a Plataforma
            funcione adequadamente.{" "}
          </li>
          <li>
            7.3.2 Uso de cookies: Informações sobre o seu uso da Plataforma
            podem ser coletadas por terceiros, por meio de cookies. Cookies
            são informações armazenadas diretamente no computador que você
            está utilizando. Os cookies permitem a coleta de informações tais
            como o tipo de navegador, o tempo despendido na Plataforma, as
            páginas visitadas, as preferências de idioma, e outros dados de
            tráfego anônimos. Nós e nossos prestadores de serviços utilizamos
            informações para proteção de segurança, para facilitar a
            navegação, exibir informações de modo mais eficiente, e
            personalizar sua experiência ao utilizar a Plataforma, assim como
            para rastreamento online. Também coletamos informações
            estatísticas sobre o uso da Plataforma para aprimoramento contínuo
            do nosso design e funcionalidade, para entender como a Plataforma
            é utilizada e para auxiliá-lo a solucionar questões relativas à
            Plataforma.{" "}
          </li>
        </ul>
        <h2 className={style.SubTitle}>8. Direitos do Usuário</h2>
        <p>8.1 Você pode, a qualquer momento, requerer ao SCManager:</p>
        <ul className={style.UlStyle}>
          <li>
            {" "}
            (i) confirmação de que seus Dados Pessoais estão sendo tratados;{" "}
          </li>
          <li> (ii) acesso aos seus Dados Pessoais; </li>
          <li>
            {" "}
            (iii) correções a dados incompletos, inexatos ou desatualizados;{" "}
          </li>
          <li>
            {" "}
            (iv) anonimização, bloqueio ou eliminação de dados desnecessários,
            excessivos ou tratados em desconformidade com o disposto em lei;{" "}
          </li>
          <li>
            {" "}
            (v) portabilidade de Dados Pessoais a outro prestador de serviços,
            contanto que isso não afete nossos segredos industriais e
            comerciais;{" "}
          </li>
          <li>
            {" "}
            (vi) eliminação de Dados Pessoais tratados com seu consentimento,
            na medida do permitido em lei;{" "}
          </li>
          <li>
            {" "}
            (vii) informações sobre as entidades às quais seus Dados Pessoais
            tenham sido compartilhados
          </li>
          <li>
            {" "}
            (viii) informações sobre a possibilidade de não fornecer o
            consentimento e sobre as consequências da negativa; e
          </li>
          <li>
            {" "}
            (ix) revogação do consentimento. Os seus pedidos serão tratados
            com especial cuidado de forma a que possamos assegurar a eficácia
            dos seus direitos. Poderá lhe ser pedido que faça prova da sua
            identidade de modo a assegurar que a partilha dos Dados Pessoais é
            apenas feita com o seu titular.{" "}
          </li>
        </ul>
        <p>
          8.2 Você deve ter em mente que, em certos casos (por exemplo, devido
          a requisitos legais), o seu pedido poderá não ser imediatamente
          satisfeito, além de que o SCManager poderá não conseguir atendê-lo por
          conta de cumprimento de obrigações legais.
        </p>
        <h2 className={style.SubTitle}>9. Segurança dos Dados Pessoais</h2>
        <p>
          9.1 Buscamos adotar as medidas técnicas e organizacionais previstas
          pelas Leis de Proteção de Dados adequadas para proteção dos Dados
          Pessoais na nossa organização. Infelizmente, nenhuma transmissão ou
          sistema de armazenamento de dados tem a garantia de serem 100%
          seguros. Caso tenha motivos para acreditar que sua interação conosco
          tenha deixado de ser segura (por exemplo, caso acredite que a
          segurança de qualquer uma de suas contas foi comprometida), favor
          nos notificar imediatamente.{" "}
        </p>
        <h2 className={style.SubTitle}>10. Links de hipertexto para outros sites e redes sociais</h2>
        <p>
          10.1 A Plataforma poderá, de tempos a tempos, conter links de
          hipertexto que redireciona você para sites das redes dos nossos
          parceiros, anunciantes, fornecedores etc. Se você clicar em um
          desses links para qualquer um desses sites, lembramos que cada site
          possui as suas próprias práticas de privacidade e que não somos
          responsáveis por essas políticas. Consulte as referidas políticas
          antes de enviar quaisquer Dados Pessoais para esses sites.{" "}
        </p>
        <br/>
        <p>
          10.2 Não nos responsabilizamos pelas políticas e práticas de coleta,
          uso e divulgação (incluindo práticas de proteção de dados) de outras
          organizações, tais como Facebook, Apple, Google, Microsoft, ou de
          qualquer outro desenvolvedor de software ou provedor de aplicativo,
          plataforma de mídia social, sistema operacional, prestador de
          serviços de internet sem fio ou fabricante de dispositivos,
          incluindo todos os Dados Pessoais que divulgar para outras
          organizações por meio dos aplicativos, relacionadas a tais
          aplicativos, ou publicadas em nossas páginas em mídias sociais. Nós
          recomendamos que você se informe sobre a política de privacidade de
          cada site visitado ou de cada prestador de serviço utilizado.{" "}
        </p>
        <h2 className={style.SubTitle}>11. Uso da Plataforma por menores de idade</h2>
        <p>
          11.1 A plataforma não se destina a pessoas com menos de 18(dezoito)
          anos e pedimos que tais pessoas não nos forneça qualquer dado
          pessoal.{" "}
        </p>
        <h2 className={style.SubTitle}>12. Atualizações desta Política de Privacidade</h2>
        <p>
          12.1 Se modificarmos nossa Política de Privacidade, publicaremos o
          novo texto na Plataforma, com a data de revisão atualizada. Podemos
          alterar esta Política de Privacidade a qualquer momento. Caso haja
          alteração significativa nos termos desta Política de Privacidade,
          podemos informá-lo por meio das informações de contato que tivermos
          em nosso banco de dados ou por meio de notificação em nossa
          Plataforma.{" "}
        </p>
        <br/>
        <p>
          12.2 Recordamos que nós temos como compromisso não tratar os seus
          Dados Pessoais de forma incompatível com os objetivos descritos
          acima, exceto se de outra forma requerido por lei ou ordem judicial.{" "}
        </p>
        <br/>
        <p>
          12.3 Sua utilização da Plataforma após as alterações significa que
          aceitou as Políticas de Privacidade revisadas. Caso, após a leitura
          da versão revisada, você não esteja de acordo com seus termos, favor
          encerrar o acesso à Plataforma.{" "}
        </p>
        <h2 className={style.SubTitle}>13. Encarregado do tratamento dos Dados Pessoais</h2>
        <p>
          13.1 Caso pretenda exercer qualquer um dos direitos previstos nesta
          Política de Privacidade e/ou nas Leis de Proteção de Dados, ou
          resolver quaisquer dúvidas relacionadas ao Tratamento de seus Dados
          Pessoais, favor contatar-nos através do e-mail contato@secondmind.com.br.{" "}
        </p>
        <br/>
        <p>
          13.2 O SCManager definiu a Deyvison como Encarregada do
          tratamento dos Dados Pessoais, podendo ser contactada pelo e-mail
          contato@secondmind.com.br
        </p>
      </div>
      <Footer />
    </div>
  );
}

export default Politicadeprivacidade;
