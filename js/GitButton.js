class GitButton {
    constructor(_gitHubLink){
        this.addScript();
        this.addButton(_gitHubLink);
    }
    addScript(){
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.setAttribute("async", "true");
        script.setAttribute("defer", "true");
        script.setAttribute("src", "https://buttons.github.io/buttons.js");
        document.documentElement.firstChild.appendChild(script);

    }
    addButton(_gitHubLink){
        const container = document.createElement('div');
        container.style.margin = '1em'
        container.style.position ='absolute';
        container.style.bottom ='0';
        container.style.zIndex ='100';
        const button = document.createElement('a');
        button.className = "github-button";
        button.href = _gitHubLink;
        button.innerHTML = "Star";
        button.setAttribute('data-show-count', 'false');
        button.setAttribute('aria-label', `Star ${_gitHubLink} on GitHub`);
        container.appendChild(button);
        document.body.appendChild(container);
    }
}

