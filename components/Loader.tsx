import styles from "../styles/Loader.module.scss";
import React from "react";

export const Loader = ({loaded = true, children, error = false, hide = false}) => {
    return(
        <div className={styles.loader}>
            {
                hide ? '' :
                    loaded ?
                        (error ? 'We are sorry, we encountered error' : <div>{children}</div>) : <div className={styles.loaderInner}>
                            <div className={styles.loaderElement}/></div>
            }
        </div>

    );
}