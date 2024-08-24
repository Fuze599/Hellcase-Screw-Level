let modalObserver = null;
let hasModal = false;

function addScrewingLevelOnModal() {
    if (!hasModal) {
        hasModal = true;
        const rows = document.querySelectorAll('.table .table-body .table-item');

        sum = 0
        rows.forEach(row => {
            const price = Number(row.querySelector('.table-item__price .base-price .base-price__value').innerHTML);
            const dropRate = Number(row.querySelector('.table-item__odds-number').innerHTML.replace('%', '').trim()) / 100;
            sum += price * dropRate

        });

        const caseTitle = document.querySelector('.case-name');
        caseTitle.innerHTML = caseTitle.innerHTML + " (Avg : " + '<span class="base-price base-price_primary"><span class="base-price__currency">1&nbsp;</span><span class="base-price__value">' + sum.toFixed(2) + '</span></span>' + ")"
    }
}

function observeModal() {
    if (modalObserver) return;

    modalObserver = new MutationObserver((mutationsList) => {
        for (const mutation of mutationsList) {
            if (mutation.type === 'childList') {
                const modal = document.querySelector('.table-item__odds-number');

                if (modal) {
                    if (!hasModal) {
                        addScrewingLevelOnModal();
                    }
                } else {
                    hasModal = false;
                }
                observeModal();
            }
        }
    });

    modalObserver.observe(document.body, { childList: true, subtree: true });
}

observeModal();