function tabs() {
    let infoHeader = document.querySelector('.info-header');
    let infoHeaderTabs = document.querySelectorAll('.info-header-tab');
    let infoTabContents = document.querySelectorAll('.info-tabcontent');


    function hideContentTabs(index) {
        for (let i = index; i < infoTabContents.length; ++i) {
            infoTabContents[i].classList.remove("show");
            infoTabContents[i].classList.add("hide");
        }
    }


    function showContentTab(index) {
        infoTabContents[index].classList.remove("hide");
        infoTabContents[index].classList.add("show");
    }

    hideContentTabs(1);

    infoHeader.addEventListener('click', event => {
        let target = event.target;
        if (target && target.classList.contains('info-header-tab')) {
            console.log(infoTabContents);
            for (let i = 0; i < infoHeaderTabs.length; ++i) {
                if (target == infoHeaderTabs[i]) {
                    hideContentTabs(0);
                    showContentTab(i);
                    break;
                }
            }
        }
    });
}
module.exports = tabs;