package com.mysite.core.models;

import com.adobe.cq.export.json.ComponentExporter;

// Sling Models intended to be used with SPA Editor must extend ComponentExporter interface
public interface CardModel extends ComponentExporter {

    public String getLabel();

}