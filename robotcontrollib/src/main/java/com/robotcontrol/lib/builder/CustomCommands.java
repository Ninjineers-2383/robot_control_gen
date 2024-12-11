package com.robotcontrol.lib.builder;

import edu.wpi.first.math.Pair;
import edu.wpi.first.wpilibj.DriverStation;
import edu.wpi.first.wpilibj2.command.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.function.Function;

/** Utility class for managing named commands */
public class CustomCommands {
  private static final HashMap<String, Function<CommandParameter[], Command>> customCommands =
      new HashMap<>();

  /**
   * Registers a command with the given name.
   *
   * @param name the name of the command
   * @param commandSupplier the command to register
   */
  public static void registerCommand(
      String name, Function<CommandParameter[], Command> commandSupplier) {
    customCommands.put(name, commandSupplier);
  }

  /**
   * Registers a list of commands with their associated names.
   *
   * @param commands the list of commands to register
   */
  public static void registerCommands(
      List<Pair<String, Function<CommandParameter[], Command>>> commands) {
    for (var pair : commands) {
      registerCommand(pair.getFirst(), pair.getSecond());
    }
  }

  /**
   * Registers a map of commands with their associated names.
   *
   * @param commands the map of commands to register
   */
  public static void registerCommands(Map<String, Function<CommandParameter[], Command>> commands) {
    customCommands.putAll(commands);
  }

  /**
   * Returns whether a command with the given name has been registered.
   *
   * @param name the name of the command to check
   * @return true if a command with the given name has been registered, false otherwise
   */
  public static boolean hasCommand(String name) {
    return customCommands.containsKey(name);
  }

  /**
   * Returns the command with the given name.
   *
   * @param name the name of the command to get
   * @return the command with the given name, wrapped in a functional command, or a none command if
   *     it has not been registered
   */
  public static Command getCommand(String name, CommandParameter... parameters) {
    if (hasCommand(name)) {
      try {
        return CommandUtil.wrappedEventCommand(customCommands.get(name).apply(parameters));
      } catch (Exception e) {
        DriverStation.reportError(
            "Error creating command '" + name + "': " + e.getMessage(), e.getStackTrace());
        return Commands.none();
      }
    } else {
      DriverStation.reportWarning(
          "PathPlanner attempted to create a command '"
              + name
              + "' that has not been registered with NamedCommands.registerCommand",
          false);
      return Commands.none();
    }
  }
}
