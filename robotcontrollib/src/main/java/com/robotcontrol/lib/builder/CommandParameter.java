package com.robotcontrol.lib.builder;

public class CommandParameter {
  protected enum Type {
    STRING,
    INTEGER
  }

  protected final String value_str;
  protected final int value_int;
  protected final Type type;

  protected CommandParameter(String string, int integer, Type type) {
    value_str = string;
    value_int = integer;
    this.type = type;
  }

  public static CommandParameter fromString(String value) {
    return new CommandParameter(value, 0, Type.STRING);
  }

  public static CommandParameter fromInt(int value) {
    return new CommandParameter(null, value, Type.INTEGER);
  }

  public String getString() {
    if (type != Type.STRING) {
      throw new IllegalStateException("Parameter is not a string");
    }
    return value_str;
  }

  public int getInt() {
    if (type != Type.INTEGER) {
      throw new IllegalStateException("Parameter is not an integer");
    }
    return value_int;
  }

  public boolean isString() {
    return type == Type.STRING;
  }

  public boolean isInt() {
    return type == Type.INTEGER;
  }
}
