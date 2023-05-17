import { useState } from "react";
import { Modal } from "~/components/ui/Modal/Modal";
import { BuildProjectModalContent, BuildProjectItemModalContent, BuildSprintCollectionModalContent, BuildSprintModalContent } from "./ChildrenTable";

import styles from './projectControlPage.module.scss';

export function ProjectFloatingButton({ reloadList }) {
  const [showFloatOptions, setShowFloatOptions] = useState(false);

  return (
    <div className={styles.container}>
      <input type="checkbox" id={styles.toggle} checked={showFloatOptions} onClick={() => setShowFloatOptions(!showFloatOptions)} />
      <label className={styles.button} htmlFor={styles.toggle}></label>
      {showFloatOptions &&
        <nav className={styles.nav}>
          <ul>
            <a>
              <Modal
                title={"Adicionar projeto"}
                fixed
                openButton={
                  <>
                    Adicionar projeto
                  </>
                  // text={"Adicionar projeto"}
                }
              // onClose={reloadList}
              >
                <BuildProjectModalContent />
              </Modal>
            </a>
            <a>
              <Modal
                title={"Adicionar sprint"}
                fixed
                openButton={<>Adicionar sprint</>}
              // onClose={reloadList}
              >
                <BuildSprintModalContent />
              </Modal>
            </a>

            <a>
              <Modal
                title={"Adicionar história"}
                fixed
                openButton={
                  <>
                    Adicionar história
                  </>
                  // text={"Adicionar projeto"}
                }
              // onClose={reloadList}
              >
                <BuildSprintCollectionModalContent />
              </Modal>
            </a>
            <a>
              <Modal
                title={"Adicionar item de projeto"}
                fixed
                openButton={
                  <>
                    Adicionar item de projeto
                  </>
                  // text={"Adicionar projeto"}
                }
              // onClose={reloadList}
              >
                <BuildProjectItemModalContent />
              </Modal>
            </a>
          </ul>
        </nav>
      }
    </div>
  )
}