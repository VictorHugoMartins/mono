import { IconTypes } from "~/components/ui/Icon/icon.interface";

export type RenderMenuType = {
    id: string;
    name: string;
    url: string;
    group: string;
    menuIconName?:IconTypes;
    itens: RenderMenuType[],
}