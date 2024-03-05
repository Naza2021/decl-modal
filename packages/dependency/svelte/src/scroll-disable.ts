/** If visible disable scroll if not enable it */
export const toggleWindowScroll = (visible?: boolean) => {

    if (visible) {
        // const tiemout = setTimeout(() => {
        //     document.documentElement.style.overflow = 'auto';
        //     document.documentElement.style.paddingRight = '0px';
        // }, 200);

        // return () => {
        //     tiemout && clearTimeout(tiemout);
        // };

        document.documentElement.style.overflow = 'auto';
        document.documentElement.style.paddingRight = '0px';
        return
    }

    document.documentElement.style.paddingRight = `${window.innerWidth - document.documentElement.offsetWidth
        }px`;
    document.documentElement.style.overflow = 'hidden';
}