import React, { CSSProperties, useState } from "react";
import DataTableButton from "~/components/ui/DataTable/DataTableButton/DataTableButton";
import Flexbox from "~/components/ui/Layout/Flexbox/Flexbox";
import { Modal } from "~/components/ui/Modal/Modal";
import Typography from "~/components/ui/Typography/Typography";
import { UserCreatedType } from "~/services/calendar.service";
import styles from "./userListRender.module.scss";

interface UserListRenderProps {
  users: UserCreatedType[],
  editable?: boolean;
  /** propriede que tras numero de imagens a serem usadas vai de 0 ao valor que for colocado
   * Padrão 4
   */
  imagesQuantity?: number;
  style?: CSSProperties;
  widthImage?: number;
  heightImage?: number;
}

const UserListRender: React.FC<UserListRenderProps> = ({ users, style, editable, imagesQuantity = 4, heightImage,widthImage }) => {
  function UsersList() {
    return (
      <div style={style} className={styles.linkedUsers}>

        {users?.length > 0 && users.slice(0, imagesQuantity).map((user, index) => {
          return (
            <img
              key={user.id}
              src={user.profileImage ? user.profileImage : "https://apiscm.secondmind.com.br/static/ApplicationUser/Default/PROFILE_DEFAULT.png"}
              width={widthImage? widthImage : 30} height={heightImage ? heightImage : 30} style={{ marginLeft: index > 0 ? -7 - (1 * index) : 0 }}
              title={user.name}
            />
          )
        })}
        {
          users.length > imagesQuantity && (
            <>
              <div style={{ alignItems: 'center', display: 'flex', marginInline: 2 }}>
                <p>+{users.length - imagesQuantity}</p>
              </div>
            </>
          )
        }
        {editable && <button style={{ marginLeft: -7 - (1 * (users.length + 1)) }}>
          <DataTableButton
            icon="FaLink" title="Vincular Usuários"
            backgroundColor="#E8E8E8"
            iconColor="#A4A4A4"
          />
        </button>}

      </div>
    )
  }

  return (
    <Modal
      title={"Responsáveis"}
      openButton={<UsersList />}
    >
      {users?.length > 0 && users.map((user, index) => {
        return (
          <Flexbox flexDirection="column" key={user.id}>
            <Flexbox spacing="p" align="center" justify="center">
              <img
                src={user.profileImage ? user.profileImage : "https://apiscm.secondmind.com.br/static/ApplicationUser/Default/PROFILE_DEFAULT.png"}
                width={40} height={40}
                style={{ margin: 8, borderRadius: '50%' }}
                title={user.name}
              />
              <Typography component="p">{user.name}</Typography>
            </Flexbox>
          </Flexbox>

        )
      })}
    </Modal>
  );
};

export default UserListRender;