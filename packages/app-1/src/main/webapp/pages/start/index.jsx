import React from 'react';

import layout from '@splunk/react-page';
import Component1 from '@splunk/component-1';
import Component2 from '@splunk/component-2';
import { getUserTheme } from '@splunk/splunk-utils/themes';

import { StyledContainer, StyledGreeting } from './StartStyles';

getUserTheme()
    .then((theme) => {
        layout(
            <StyledContainer>
                <StyledGreeting>Hey hiiii </StyledGreeting>
                <div>hey gentlemen you are more then welcome over here</div>
                <Component1 name="from inside Component1" />
                <Component2 name="from inside Component1" />


            </StyledContainer>,
            {
                theme,
            }
        );
    })
    .catch((e) => {
        const errorEl = document.createElement('span');
        errorEl.innerHTML = e;
        document.body.appendChild(errorEl);
    });
