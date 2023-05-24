import React from "react";
import Typography from "~/components/ui/Typography/Typography";
// import googlePlay from "~/assets/images/googlePlay.png";
// import appStore from "~/assets/images/appStore.png";
// import navBarIconWhite from "~/assets/images/navBarIconWhite.png";
import styles from "~/components/ui/Footer/footer.module.scss";
import RedirectTo from "~/utils/Redirect/Redirect";

const Footer: React.FC = () => {

  return (
    <footer style={{ width: "100%" }}>
      <div className={styles.footer}>
        <div className={styles.item} id={styles.copyright}>
          {/* <img src={navBarIconWhite} /> */}
          <Typography component="caption"></Typography>
        </div>
        {/* <div className={styles.item} id={styles.terms}
          onClick={() => RedirectTo('/politicadeprivacidade')}
        >
          <Typography component="p">Termos & Privacidade</Typography>
        </div> */}
        <div className={styles.item} id={styles.store}>
          <a target="_blank" href="https://play.google.com/store/apps/details?id=br.com.secondmind.scmanager&pli=1">
            <picture>
              {/* <img className={styles.appLink} src={googlePlay} alt="Google Play Store" /> */}
            </picture>
          </a>
          <a target="_blank" href="https://apps.apple.com/br/app/scmanager-second-mind/id1662333045">
            <picture>
              {/* <img className={styles.appLink} src={appStore} alt="APP Store" /> */}
            </picture>
          </a>
        </div>
      </div>
    </footer>
  )
}


export default Footer;