
package com.allstate.compozed.othello.domain;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder({
    "row"
})
public class Row {

    @JsonProperty("row")
    private String row;

    @JsonProperty("row")
    public String getRow() {
        return row;
    }

    @JsonProperty("row")
    public void setRow(String row) {
        this.row = row;
    }

}
