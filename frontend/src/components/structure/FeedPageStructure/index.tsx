import React, { useEffect, useState } from "react";
import { Grid } from "~/components/ui/Layout/Grid";
import postsService from "~/services/posts.service";
import { PostsMessageType } from "~/types/global/PostsMessageType";
import { SelectOptionsType } from "~/types/global/SelectObjectType";

import MessageItem from "./components/MessageItem";

import style from "./feedPageStructure.module.scss";

interface FeedPageStructureProps {
  getPath: string;
  firstSelected?: boolean;
  buttons?: React.ReactNode;
  createPath?: string;
  createButtonText?: string;
}

const FeedPageStructure: React.FC<FeedPageStructureProps> = ({
  buttons,
  createPath,
  createButtonText,
  getPath,
  firstSelected,
}) => {
  const [_info, setInfo] = useState<SelectOptionsType>(null);
  const [_messages, setMessages] = useState<PostsMessageType[]>(null);

  useEffect(() => {
    _getData();
  }, []);

  async function _getData() {
    let response = await postsService.getInfo(getPath);
    if (response) {
      setInfo(response.infos);
      setMessages(response.posts);
    }
  }

  return (
    <>
      <div className={style.container}>
        <Grid container spacing={"xg"}>
          <Grid md={12}>
            <Grid container spacing={"xg"}>
              {_messages?.length > 0 && (
                <>
                  {_messages.map((item, i) => (
                    <Grid md={12} key={`messageItem-${i}`}>
                      <MessageItem
                        data={{
                          selected: firstSelected && i === 0,
                          ...item,
                        }}
                        refreshList={_getData}
                      />
                    </Grid>
                  ))}
                </>
              )}
            </Grid>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default FeedPageStructure;
