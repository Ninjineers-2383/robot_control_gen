package com.robotcontrol.lib.commands;

import com.robotcontrol.lib.builder.CommandUtil;
import edu.wpi.first.wpilibj.DriverStation;
import edu.wpi.first.wpilibj.Filesystem;
import edu.wpi.first.wpilibj2.command.Command;
import edu.wpi.first.wpilibj2.command.Commands;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

public class HotReloadCommand extends Command {
  private Command command;

  public HotReloadCommand(String name) {
    try (BufferedReader br =
        new BufferedReader(
            new FileReader(
                new File(
                    Filesystem.getDeployDirectory(), "robotcontrol/groups/" + name + ".group")))) {
      StringBuilder fileContentBuilder = new StringBuilder();
      String line;
      while ((line = br.readLine()) != null) {
        fileContentBuilder.append(line);
      }

      String fileContent = fileContentBuilder.toString();
      JSONObject json = (JSONObject) new JSONParser().parse(fileContent);

      initFromJson(json);
    } catch (Exception e) {
      DriverStation.reportError("Failed to build command group " + name, e.getStackTrace());
      this.command = Commands.none();
    }
  }

  private void initFromJson(JSONObject json) {
    try {
      this.command = CommandUtil.commandFromJson(json);
    } catch (Exception e) {
      DriverStation.reportError("Failed to build command group from json", e.getStackTrace());
      this.command = Commands.none();
    }
  }

  @Override
  public void initialize() {
    this.command.initialize();
  }

  @Override
  public void execute() {
    this.command.execute();
  }

  @Override
  public void end(boolean interrupted) {
    this.command.end(interrupted);
  }

  @Override
  public boolean isFinished() {
    return this.command.isFinished();
  }
}
