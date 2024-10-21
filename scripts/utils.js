import { partners } from './partners.js';
import { slider } from './slider.js';
import { controlCenter } from './controls.js';
import { timeHandlers } from './time.js';
import { elements } from './elements.js';

export function parseQueryString(query) {
    if (!query) {
        return null;
    } else {
        const tokens = query.split('?')[1].split('&').map(t => t.split('='));
        return tokens.reduce((p, [k, v]) => Object.assign(p, { [k]: v }), {});
    }
};

export function extractTimeQuery(queryObj = {}) {
    return Object.keys(queryObj).reduce((acc, curr) => {
        if (curr === 'm' || curr === 's') {
            let value = queryObj[curr];
            if (value < 10) {
                value = `0${value}`
            } else if (value >= 59) {
                value = 59;
            }
            Object.assign(acc, { [curr]: value })
        }
        return acc;
    }, {});
};

export function manageQueryString(search) {
    const queries = parseQueryString(search);

    if (queries) {
        const { on, mod, prep } = queries;
        const { m, s } = extractTimeQuery(queries);

        if (m) {
            elements.time.minutes().textContent = formatTimeContent(m || 0);
            elements.time.seconds().textContent = formatTimeContent(s || 0);
        } else if (prep) {
            elements.time.minutes().textContent = formatTimeContent(getMinutesToSet());
        }

        if (mod === "false") { elements.modal.closeButton().click(); }
    }
};

export function formatTimeContent(value) {
    return Number(value).toString().padStart(2, 0);
};

export function getMinutesToSet() {
    const currentMinutes = new Date().getMinutes();
    const currentHalf = Number(currentMinutes) >= 30 ? 60 : 30;
    return (currentHalf - currentMinutes);
};

export function setupEvents() {
    elements.time.minutes().addEventListener('wheel', timeHandlers.minutes);
    elements.time.seconds().addEventListener('wheel', timeHandlers.seconds);
};

export function appendPartnersElements() {
    partners.concat(partners).forEach(slider.appendPartner);
};

export function scrollToTheBottom() {
    elements.scroll.a().click();
};
