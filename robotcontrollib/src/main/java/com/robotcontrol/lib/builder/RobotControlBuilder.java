package com.robotcontrol.lib.builder;

import com.robotcontrol.lib.commands.HotReloadCommand;
import edu.wpi.first.wpilibj.DriverStation;
import edu.wpi.first.wpilibj.Filesystem;
import edu.wpi.first.wpilibj2.command.Command;
import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

/** Utility class used to build auto routines */
public class RobotControlBuilder {
  private static boolean configured = false;

  /** Configures the AutoBuilder for using PathPlanner's built-in commands. */
  public static void configure() {
    if (configured) {
      DriverStation.reportError(
          "Auto builder has already been configured. This is likely in error.", true);
    }
  }

  /**
   * Get a list of all auto names in the project
   *
   * @return List of all auto names
   */
  public static List<String> getAllCommandGroupNames() {
    File[] groupFiles =
        new File(Filesystem.getDeployDirectory(), "robotcontrol/groups").listFiles();

    if (groupFiles == null) {
      return new ArrayList<>();
    }

    return Stream.of(groupFiles)
        .filter(file -> !file.isDirectory())
        .map(File::getName)
        .filter(name -> name.endsWith(".group"))
        .map(name -> name.substring(0, name.lastIndexOf(".")))
        .collect(Collectors.toList());
  }

  public static Command buildCommandGroup(String name) {
    return new HotReloadCommand(name);
  }

  /** Functional interface for a function that takes 3 inputs */
  @FunctionalInterface
  public interface TriFunction<In1, In2, In3, Out> {
    /**
     * Apply the inputs to this function
     *
     * @param in1 Input 1
     * @param in2 Input 2
     * @param in3 Input 3
     * @return Output
     */
    Out apply(In1 in1, In2 in2, In3 in3);
  }
}
