import React, { useContext, useState, useEffect, createContext } from "react";
import menuService from "~/services/menu.service";
import { RenderMenuType } from "~/types/global/RenderMenuType";
import IsLogged from "~/utils/IsLogged/IsLogged";

type MenuContextType = {
  menus?: RenderMenuType[]|[];
  getMenuOptions: () => void;
};

//------------- Criando Context ---------------//
const MenuContext = createContext({} as MenuContextType);

export function MenuProvider({children}){
    const [menus, setMenus] = useState<RenderMenuType[]>([]);
    
    const getMenuOptions = () => {
        if (IsLogged()) {
            menuService.getUserMenu("ASIDE").then((response) => {
                if (response.success) {
                    setMenus(response.object);
                }
            });
        }
    }

    return(
        <>
            <MenuContext.Provider value={{menus,getMenuOptions}}>
                {children}
            </MenuContext.Provider>
        </>
    )
}

export function useMenuContext(){
    const menu = useContext(MenuContext);
    return menu;
}